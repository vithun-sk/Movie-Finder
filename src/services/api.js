const API_KEY = "60f32e9f4ccbea87a65c980c191560dc";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (operations,page, query="") => {
  try {
    let URL = `${BASE_URL}/${operations}?api_key=${API_KEY}&language=en-US&page=${page}`
    if(operations === "search/movie" && query){
      URL += `&query=${encodeURIComponent(query)}`;
    }
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Network response failed");
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("API Error :", error.message);
    return  [] ;
  } finally {
    console.log("Fetch attempt finished");
  }
};
