from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "page": "home"})

@app.get("/members", response_class=HTMLResponse)
def members(request: Request):
    return templates.TemplateResponse("members.html", {"request": request, "page": "members"})

@app.get("/instruments", response_class=HTMLResponse)
def instruments(request: Request):
    return templates.TemplateResponse("instruments.html", {"request": request, "page": "instruments"})

@app.get("/goods", response_class=HTMLResponse)
def goods(request: Request):
    return templates.TemplateResponse("goods.html", {"request": request, "page": "goods"})

@app.get("/videos", response_class=HTMLResponse)
def videos(request: Request):
    return templates.TemplateResponse("videos.html", {"request": request, "page": "videos"})
