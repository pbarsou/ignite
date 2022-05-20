const express = require("express");
const req = require("express/lib/request");
const { v4: uuidv4 } = require("uuid");
// renomeamos 'v4' para 'uuidv4'
// 'v4' é a versão do 'uuid' que gera números randomicos

const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((costumer) => costumer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Customer not found"})
  }

  request.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if(operation.type === 'credit') {
      return acc + operation.amount;
    } else {
        return acc - operation.amount;
    }
  }, 0);

  return balance;
}

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const custumersAlreadyExists = customers.some(
    (custumer) => custumer.cpf === cpf
  );

  if (custumersAlreadyExists){
    return response.status(400).json({ error: "Customer already exists!"});
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return response.status(201).send();
  // 'send()' vazio porque não queremos mostrar nenhuma informação 

})

app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer.statement);
})

app.post('/deposit',verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    create_at: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation);

  return response.status(201).send();
})

app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if(balance < amount) {
    return response.status(400).json({ error: "Insufficient founds!"})
  }

  const statementOperation = {
    amount,
    creat_at: new Date(),
    type: "debit"
  }

  customer.statement.push(statementOperation);

  return response.status(201).send();
})

app.get('/statement/date', verifyIfExistsAccountCPF, (request, response) => {
  const { date } = request.params;
  const { customer } = request;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(
    (statement) => 
    statement.create_at.toDateString() === 
    new Date(dateFormat).toDateString())

  return response.json(customer.statement);
})

app.put('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  return response.status(201).send();
})

app.get('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer);
})

app.delete('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  customers.splice(customer, 1);
  // tira 1 elemento a partir do customer indicado (ou seja, tira o customer correspondente)
  
  return response.status(200).json(customers);
})

app.get('/balance', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  const balance = getBalance(customer.statement);

  return response.json(balance);
})

app.listen(3333); 