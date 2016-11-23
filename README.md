# AXAN
Trabalho de Projeto de Software

iniciar server:
node axan/app/server


<b>Documentação serviços</b>
 ____________________________________
 
request: http://localhost:3000/api/security/logon/solicita-acesso

method: Post

response: 

{

    "result": {
    
        "token": "Le75HqVUGPg40k57UDvUtxOhFncSXeEAjBVg2CVtuRmBVrpwbhz3hqSaB+dv1UmWbRxhcfqEKeF+V9d3NtEazQ=="
    
    }

}

 ____________________________________
 
request: http://localhost:3000/api/security/logon/Le75HqVUGPg40k57UDvUtxOhFncSXeEAjBVg2CVtuRmBVrpwbhz3hqSaB+dv1UmWbRxhcfqEKeF+V9d3NtEazQ==

method: Post

Params: tokenAcess      Obrigatório: Sim Type: PathParam

response: 

{

    "result": {
    
        "token": "Le75HqVUGPg40k57UDvUtxOhFncSXeEAjBVg2CVtuRmBVrpwbhz3hqSaB+dv1UmWbRxhcfqEKeF+V9d3NtEazQ==",
        
        "usuario": {
        
            "id": "1111111111",
            
            "nome": "Batinha"
        },
        
        "roles": [
        
            "ADMIN"
        
        ]
    
    }

}

 ____________________________________
 
