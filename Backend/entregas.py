import sqlite3
import os

def entregas_db():
    # Garante que estamos na pasta correta.
    db_path = os.path.join(os.path.dirname(__file__), "entregas.db")
    
    # Criar ou conectar ao banco.
    conn = sqlite3.connect(db_path)
    
    try:
        # Criar a tabela.
        conn.execute('''
        CREATE TABLE IF NOT EXISTS entregas (
            id INTEGER PRIMARY KEY,
            cliente TEXT NOT NULL,
            destino TEXT NOT NULL,
            status TEXT NOT NULL
        )
        ''')
        
        conn.commit()
        print(f"Banco de dados criado com sucesso em: {db_path}")
        
    except Exception as e:
        print(f"Erro ao criar banco: {e}")
        raise
    finally:
        conn.close()

if __name__ == "__main__":
    entregas_db()