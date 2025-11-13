import streamlit as st
import requests

st.title("Painel Logístico - TechBridge")
st.sidebar.header("Cadastrar Nova Entrega")

id = st.sidebar.number_input("ID", step=1, min_value=1)
cliente = st.sidebar.text_input("Cliente")
destino = st.sidebar.text_input("Destino")
status = st.sidebar.selectbox("Status", ["Pendente", "Em Trânsito", "Entregue"])

if st.sidebar.button("Salvar Entrega"): #Cria um botão para salvar a entrega.
    data = {"id": id, "cliente": cliente, "destino": destino, "status": status}
    response = requests.post("http://127.0.0.1:8000/entregas/", json=data)
    if response.status_code == 200: 
        st.sidebar.success("Entrega registrada com sucesso!")
    else:
        st.sidebar.error("Erro ao registrar entrega.")
    
st.header("Entregas Registradas") #Exibe as entregas registradas.
response = requests.get("http://127.0.0.1:8000/entregas/")
if response.status_code == 200:
    entregas = response.json().get("entregas", [])
    for entrega in entregas:
        st.write(f"ID: {entrega[0]}, Cliente: {entrega[1]}, Destino: {entrega[2]}, Status: {entrega[3]}")
else:
    st.error("Erro ao carregar entregas.")
    

st.sidebar.header("Atualizar Entrega") #Atualiza uma entrega pelo ID
entrega_id = st.sidebar.number_input("ID da Entrega a Atualizar", step=1, min_value=1)
entrega_cliente = st.sidebar.text_input("Novo Cliente")
entrega_destino = st.sidebar.text_input("Novo Destino")
entrega_status = st.sidebar.selectbox("Novo Status", ["Pendente", "Em Trânsito", "Entregue"])

if st.sidebar.button("Atualizar Entrega"):
    data = {"id": entrega_id, "cliente": entrega_cliente, "destino": entrega_destino, "status": entrega_status}
    response = requests.put(f"http://127.0.0.1:8000/entregas/{entrega_id}", json=data)
    if response.status_code == 200:
        st.sidebar.success("Entrega atualizada com sucesso!")
    else:
        st.sidebar.error("Erro ao atualizar entrega.")
        
st.sidebar.header("Deletar Entrega") #Deleta uma entrega pelo ID
entrega_delete = st.sidebar.number_input("ID da entrega a deletar", step=1, min_value=1)
if st.sidebar.button("Deletar Entrega"):
    response = requests.delete(f"http://127.0.0.1:8000/entregas/{entrega_delete}")
    if response.status_code == 200:
        st.sidebar.success("Entrega deletada com sucesso!")
    else:
        st.sidebar.error("Erro ao deletar entrega.")