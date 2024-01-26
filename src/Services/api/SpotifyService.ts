import axios from "axios";

import { TReturnSearchCall, TSearchCall, TReturnGenres, TGenresCall } from "./types";

export const searchCall = async (
  params: TSearchCall
): Promise<TReturnSearchCall> => {
  let response;
  let err;

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

export const getAvailableGenres = async (params: TGenresCall): Promise<TReturnGenres> => {
  let response;
  let err;

  try {
    const { data } = await axios.get(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
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