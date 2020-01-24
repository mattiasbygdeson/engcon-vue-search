var baseurl = window.location.hostname;

if(baseurl == "localhost") {
  baseurl = "https://engcon.com"
}

export { baseurl };