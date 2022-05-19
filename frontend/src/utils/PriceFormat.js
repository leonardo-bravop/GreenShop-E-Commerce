exports.addComasToPrice = (priceString) => {
  let pricelength = priceString.length;
  if (pricelength < 7) return priceString;
  else if (pricelength > 6 && pricelength < 10) {
    return (
      priceString.substring(0, pricelength - 6) +
      "," +
      priceString.substring(pricelength - 6, pricelength)
    );
  } else if (pricelength > 9) {
    return (
      priceString.substring(0, pricelength - 9) +
      "," +
      priceString.substring(pricelength - 9, pricelength - 6) +
      "," +
      priceString.substring(pricelength - 6, pricelength)
    );
  }
};