var baseurl = "http://" + window.location.hostname;

if(window.location.hostname == "localhost") {
  baseurl = "http://engcon.com"
}

export { baseurl };