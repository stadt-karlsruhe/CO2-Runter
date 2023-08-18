const ComputeTotalCo2 = (categories) => {

  const baseCO2 = 1.7 // 1.15;

  console.log("co2 cats:",categories)

  const cats = [
    categories[0].reduce((acc, val) => acc + val, 0),
    categories[1].reduce((acc, val) => acc + val, 0),
    categories[2].reduce((acc, val) => acc + val, 0),
    categories[3].reduce((acc, val) => acc + val, 0)
  ]

  const co2Sum = cats.reduce((acc, val) => acc + val, 0)

  console.log("Cats:",cats)
  console.log("Cat sum:",co2Sum)
  console.log("Total sum: ",co2Sum + baseCO2)

  return {cats:cats, sum: co2Sum, base: baseCO2} //, total:co2Sum + baseCO2}
};

export default ComputeTotalCo2;