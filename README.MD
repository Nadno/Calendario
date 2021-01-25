# Calendário

O calendário foi recriado a partir das funcionalidades criadas no [Cronos](https://github.com/Nadno/Cronos/blob/master/src/Date.js "Aplicação cronos"), com o intuito de aplicar uma melhor estrutura de códigos, usando responsividade no layout, Factory Functions e boas práticas para tornar o código mais legível. A parte visual da aplicação foi feita utilizando o conceito de Mobile First e Sass, e com o restante foi utilizado Javascript, e WebPack, para por em prática o uso do Minificador de arquivo.

Funcionalidades:
- Navegação por meses e anos.
- Criação de Tarefas, que podem ser criadas em um determinado dia do ano, ou caso nenhum dia esteja selecionado, é criada uma tarefa diária, que são reiniciadas todos dias.
- Criação de Eventos, que exibem uma notificação no dia marcado.
- Atualização de Tarefas. No menu é possível alterar o conteúdo textual de uma tarefa já criada.
- Save. As informações são salvas localmente quando algo é criado no calendário.
- Adaptabilidade. A aplicação usa o calendário para selecionar o dia, mês e ano, e o menu para criar Eventos e Tarefas. Portando, o uso do menu muda de acordo com o tamanho da tela do usuário. Sendo acessível por meio de um botão quando em telas menores, e sempre visível quando em telas maiores.


## Visual padrão
A aplicação é dividida em duas partes, o menu, e o calendário, onde será selecionado o dia.
<h1 align="center"><img src="/img/desktop-1.png" alt="Default image"></h1>
<br/>

## Notificação
Os Eventos já passados e atuais são adicionados as notificações.
<h1 align="center"><img src="/img/desktop-2.png" alt="Desktop image"></h1>
<br/>

## Visual Mobile
<h1 align="center"><img src="/img/mobile.png" alt="Mobile image"></h1>
<br/>
