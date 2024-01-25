import axios from "axios";

import { TReturnSearchCall, TSearchCall } from "./types";

export const searchCall = async (
  params: TSearchCall
): Promise<TReturnSearchCall> => {
  let response;
  let err;

  console.log(window.localStorage.getItem("token"));
  try {
    const { data } = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
      params,
    });
    response = data;
  } catch (error) {
    err = error;
  } finally {
    return { response, err };
  }
};
