addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const githubUrl = "https://raw.githubusercontent.com/unlmtdvpn/vpn/refs/heads/main/testjson.json";
  
  try {
    const response = await fetch(githubUrl);
    if (!response.ok) {
      return new Response("Ошибка загрузки с GitHub", { status: 500 });
    }
    
    const cleanJson = await response.text();
    const newHeaders = new Headers();
    
    newHeaders.set("Content-Type", "application/json; charset=utf-8");
    
    // Устанавливаем название "Ultra VPN" (закодировано в Base64)
    newHeaders.set("profile-title", "base64:VWx0cmEgVlBO");
    
    newHeaders.set("subscription-userinfo", "upload=0; download=383331401728; total=0; expire=1899589200");
    newHeaders.set("profile-update-interval", "1");
    newHeaders.set("Access-Control-Allow-Origin", "*");

    return new Response(cleanJson, {
      status: 200,
      headers: newHeaders
    });
    
  } catch (error) {
    return new Response("Ошибка: " + error.toString(), { status: 500 });
  }
}
