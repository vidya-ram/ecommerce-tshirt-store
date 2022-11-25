async function fetchCatalogue(url) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
  }).catch((error) => {
    console.log(error);
    throw Error(error);
  });
  return response.json();
}

export default fetchCatalogue;
