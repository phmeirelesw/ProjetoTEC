from fastapi import FastAPI
from pydantic import BaseModel
import sqlite3

app = FastAPI() #Cria a instância do FastAPI.

class Entrega(BaseModel): #Classe para definir o modelo de dados.
    id: int
    cliente: str
    destino: str
    status: str
    
@app.post("/entregas/")

def criar_entrega(entrega: Entrega): #Função de criar uma nova entrega.
    conn = sqlite3.connect("entregas.db")
    conn.execute("INSERT INTO entregas VALUES (?, ?, ?, ?)", (entrega.id, entrega.cliente, entrega.destino, entrega.status))
    conn.commit()
    return {"mensagem": "Entrega criada com sucesso!"}

@app.get("/entregas/") 

def listar_entregas(): # Rota para listar todas as entregas
    conn = sqlite3.connect("entregas.db")
    cursor = conn.execute("SELECT * FROM entregas")
    entregas = cursor.fetchall()
    return {"entregas": entregas}

@app.put("/entregas/{id}")

def atualizar_entregas(id: int, entrega: Entrega): # Rota para atualizar uma entrega
    conn = sqlite3.connect("entregas.db")
    conn.execute("UPDATE entregas SET cliente = ?, destino = ?, status = ? WHERE id = ?", (entrega.cliente, entrega.destino, entrega.status, id))
    conn.commit()
    return {"mensagem": "Entrega atualizada com sucesso!"}

@app.delete("/entregas/{id}")

def deletar_entrega(id: int): # Rota para deletar uma entrega
    conn = sqlite3.connect("entregas.db")
    conn.execute("DELETE FROM entregas WHERE id = ?", (id,))
    conn.commit()
    return {"mensagem": "Entrega deletada com sucesso!"}
    