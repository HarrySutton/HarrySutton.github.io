const game = new URLSearchParams(window.location.search).get("g");

const script = document.createElement("script");
script.src = `play/${game}.js`;

document.body.append(script)
