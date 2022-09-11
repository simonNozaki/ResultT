import axios from "axios";

const main = async () => {
  const url = `https://raw.githubusercontent.com/simonNozaki/jsons/main/items.json`;
  const res = await axios.get(url);

  console.log(res);
}
