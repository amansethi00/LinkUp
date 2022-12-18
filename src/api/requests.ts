import api from '.';

export const updateAssetsApi = async (assets) => {
  try {
    const username = localStorage.getItem('username');
    const response = await api.put(`/userData/${username}`, { assets });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const updateAssetStatusApi = async (asset) => {
  try {
    const username = localStorage.getItem('username');
    const response = await api.patch(`/userData/${username}/${asset.id}`, { ...asset });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const loginApi = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
