from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI() #Cria a instância do FastAPI.

# Configurar CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Programador(BaseModel):
    id: int
    nome: str
    especialidade: str
    experiencia: str
    formacao: str
    projetos: int
    bio: str
    tecnologias: List[str]

PROGRAMADORES_DB = [
    {
        "id": 1,
        "nome": "Ana Silva",
        "especialidade": "frontend",
        "experiencia": "5+ anos",
        "formacao": "Ciência da Computação (USP)",
        "projetos": 35,
        "bio": "Com 5+ anos de experiência em interfaces responsivas e de alta performance.",
        "tecnologias": ["React", "Vue.js", "TypeScript", "Figma"]
    },
    {
        "id": 2,
        "nome": "Bruno Costa",
        "especialidade": "backend",
        "experiencia": "8+ anos",
        "formacao": "Eng. de Software (UFCG)",
        "projetos": 20,
        "bio": "Focado em escalabilidade e microsserviços. Experiente em infraestrutura cloud.",
        "tecnologias": ["Node.js", "Python (Django)", "Java", "AWS"]
    },
    {
        "id": 3,
        "nome": "Carla Dias",
        "especialidade": "fullstack",
        "experiencia": "6+ anos",
        "formacao": "Sistemas de Informação (PUC)",
        "projetos": 15,
        "bio": "Transforma ideias em produtos completos, do banco de dados à interface do usuário.",
        "tecnologias": ["React", "Node.js", "PostgreSQL", "Docker"]
    },
    {
        "id": 4,
        "nome": "Daniel Moreira",
        "especialidade": "mobile",
        "experiencia": "5+ anos",
        "formacao": "Análise de Sistemas (FIAP)",
        "projetos": 22,
        "bio": "Criando aplicativos nativos e híbridos de alta qualidade para iOS e Android.",
        "tecnologias": ["React Native", "Flutter", "Swift", "Kotlin"]
    },
    {
        "id": 5,
        "nome": "Elisa Fernandes",
        "especialidade": "devops",
        "experiencia": "10+ anos",
        "formacao": "Redes de Computadores (Senac)",
        "projetos": 40,
        "bio": "Garantindo a estabilidade, segurança e a entrega contínua dos seus sistemas.",
        "tecnologias": ["AWS", "Kubernetes", "Terraform", "CI/CD"]
    },
    {
        "id": 6,
        "nome": "Felipe Guedes",
        "especialidade": "ml",
        "experiencia": "4+ anos",
        "formacao": "Mestrado em IA (UFRJ)",
        "projetos": 12,
        "bio": "Especializado em processamento de linguagem natural e visão computacional.",
        "tecnologias": ["Python", "TensorFlow", "PyTorch", "Scikit-learn"]
    },
    {
        "id": 7,
        "nome": "Lucas Viana",
        "especialidade": "frontend",
        "experiencia": "3+ anos",
        "formacao": "Design Digital (Anhembi)",
        "projetos": 18,
        "bio": "Focado em performance web (Core Web Vitals) e acessibilidade (WAI-ARIA).",
        "tecnologias": ["Next.js", "Gatsby", "TailwindCSS", "Web Vitals"]
    },
    {
        "id": 8,
        "nome": "Helena Martins",
        "especialidade": "backend",
        "experiencia": "9+ anos",
        "formacao": "Eng. de Computação (ITA)",
        "projetos": 14,
        "bio": "Forte experiência em sistemas financeiros de alta transação e segurança de dados.",
        "tecnologias": ["Go (Golang)", "Java", "Kafka", "Microsserviços"]
    },
    {
        "id": 9,
        "nome": "Igor Tavares",
        "especialidade": "fullstack",
        "experiencia": "7+ anos",
        "formacao": "Eng. de Computação (UFRGS)",
        "projetos": 25,
        "bio": "Expert em construir aplicações escaláveis do zero até production.",
        "tecnologias": ["React", "Node.js", "MongoDB", "AWS"]
    }
]

@app.get("/programadores/", response_model=List[Programador])
def listar_programadores(tipo: Optional[str] = Query(None)): 

    if tipo is None:
        return PROGRAMADORES_DB
    
    programadores_filtrados = [
        p for p in PROGRAMADORES_DB 
        if p["especialidade"].lower() == tipo.lower()
    ]
    
    if not programadores_filtrados:
        raise HTTPException(
            status_code=404, 
            detail=f"Nenhum programador encontrado com especialidade '{tipo}'"
        )
    
    return programadores_filtrados

@app.get("/programadores/especialidades")
def listar_especialidades():
    
    especialidades = list(set([p["especialidade"] for p in PROGRAMADORES_DB]))
    return {"especialidades": sorted(especialidades)}