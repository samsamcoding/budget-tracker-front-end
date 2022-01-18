// The goal of this helper file is to shorten written code in various parts of the project.
// The 'process.env.NEXT_PUBLIC_API_URL' changes whether the project is in local or production environment.

module.exports = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  getAccessToken: () => localStorage.getItem("token"),
  toJSON: (response) => response.json(),
  colorRandomizer: () => {
    return Math.floor(Math.random()*16777215).toString(16)
}
};
