from home.urls_frontend import GRUPOS_URLS

def urls_context(request):
    usuario = request.user
    urls = []

    if usuario.is_authenticated:
        for url in usuario.groups.all():
            if url.name in GRUPOS_URLS:
                urls.append(GRUPOS_URLS[url.name])

    return {'urls': urls}