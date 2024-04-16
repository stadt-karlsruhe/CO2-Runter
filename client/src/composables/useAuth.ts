import { onMounted, ref, watch } from 'vue';
import { useFetch } from '@vueuse/core';
import { useRouter } from 'vue-router';

export default function useAuth() {
    const isLoggedIn = ref(false);
    const router = useRouter();
    const co2Token = ref(localStorage.getItem('CO2Token'));

    const getCo2Token = () => {
        co2Token.value = localStorage.getItem('CO2Token');
    };

    const setCo2Token = (token: string) => {
        localStorage.setItem('CO2Token', token);
        co2Token.value = token;
    };

    const checkTokenValidity = useFetch('/api/isUserAuth', {
        headers: {
            co2token: `${co2Token.value}`,
        },
    });

    function executeFetch() {
        if (co2Token.value) {
            checkTokenValidity
                .execute()
                .then(() => {
                    isLoggedIn.value = true;
                })
                .catch((err) => {
                    console.error(err);
                    (async () => {
                        await logout();
                    })();
                });
        }
    }

    watch(
        () => localStorage.getItem('CO2Token'),
        (newToken) => {
            co2Token.value = newToken;

            if (newToken) {
                executeFetch();
            }
        },
        { immediate: true }
    );

    watch(
        () => checkTokenValidity.isFinished,
        (finished) => {
            console.log(checkTokenValidity.response.value);
            if (finished && checkTokenValidity.response.value!.status <= 299) {
                isLoggedIn.value = true;
            } else {
                isLoggedIn.value = false;
            }
        }
    );

    const logout = async () => {
        localStorage.removeItem('CO2Token');
        localStorage.removeItem('groupCode');
        isLoggedIn.value = false;
        executeFetch();
        location.reload();
    };

    const login = async (email: string, password: string) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            localStorage.setItem('CO2Token', data.token);
            isLoggedIn.value = true;
            executeFetch();
            router.go(-1);
        } catch (e) {
            throw e;
        }
    };

    return {
        isLoggedIn,
        checkTokenValidity,
        logout,
        login,
        getCo2Token,
        setCo2Token,
    };
}
