import axios from "axios"

const TOKEN = "celqj2aad3idmb1v9vf0celqj2aad3idmb1v9vfg"

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
})