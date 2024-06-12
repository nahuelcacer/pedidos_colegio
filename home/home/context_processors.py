from home.urls_frontend import GRUPOS_URLS

def urls_context(user):
    context = {'urls': []}
    for group in user.groups.all():
        if group.name in GRUPOS_URLS:
            context['urls'].extend(GRUPOS_URLS[group.name])
    return context