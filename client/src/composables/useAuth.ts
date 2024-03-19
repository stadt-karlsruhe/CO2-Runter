import { ref, watch } from 'vue';
import { useFetch } from '@vueuse/core';
import { useRouter } from 'vue-router';

export default function useAuth() {
    let my_cookie_value = localStorage.getItem('CO2Token');
    const isLoggedIn = ref(false);
    const router = useRouter();

    const checkTokenValidity = useFetch('/api/isUserAuth', {
        headers: {
            co2token: `${my_cookie_value}`,
        },
    });

    function executeFetch() {
        if (my_cookie_value) {
            checkTokenValidity.execute().catch((err) => {
                // Add your error handling logic here
                console.error(err);
                isLoggedIn.value = false;
            });
            isLoggedIn.value = true;
        }
    }

    watch(
        () => localStorage.getItem('CO2Token'),
        (newToken) => {
            my_cookie_value = newToken;
            executeFetch();
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

    const logout = () => {
        localStorage.removeItem('CO2Token');
        localStorage.removeItem('groupCode');
        isLoggedIn.value = false;
        executeFetch();
        location.reload();
        router.push('/');
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

    return { isLoggedIn, logout, login };
}
