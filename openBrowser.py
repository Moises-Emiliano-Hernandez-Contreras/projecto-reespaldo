import webbrowser

url=["www.google.com"]
webbrowser.register("firefox",None,
webbrowser.BackgroundBrowser("C://Program Files//Mozilla Firefox//firefox.exe"))
h=webbrowser.get("firefox")
h.open(url[0])

