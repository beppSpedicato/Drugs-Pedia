# DRUGSPEDIA
DrugsPedia è un portale che viene utilizzato per pubblicare pagine di vario tipo, dove quindi l'utente registrato ha la possibilità di creare pagine a proprio piacimento, pubblicarle e modificarle nel corso del tempo

## Framework e servizi
#### <a href="https://nextjs.org/">Next.js</a>
L'applicazione è sviluppata sul framework <a href="https://nextjs.org/">Next.js</a>, basato su nodejs e React che permette lo sviluppo di applicazioni web full-stack, dove le pagine vengono renderizzate lato server (Server Side Rendering)
#### <a href="https://firebase.google.com/">Firebase</a>
###### Firebase Authentication
Utilizzato per la gestione delle autenticazioni nella piattaforma
###### Firestore
Utilizzato come database per l'app (noSQL)

## Start e deploy
### Prima di iniziare 
###### Configurazione 
Creare un progetto <a href="https://firebase.google.com/">Firebase</a> e abilitare i servizi authentication e firestore.
Una volta entrati nella console potete vedere le vostre credenziali di progetto.
Create nel vostro progetto il file .env usando come base il file [.env.example](.env.example).
Successivamente potete sostituire i campi di esempio con le vostre credenziali di progetto.

###### Installare i pacchetti di node...
````
~ npm i
````



#### Build applicazione
````
~ npm run build
````

#### Start applicazione
````
~ npm run start
````

#### Debug
````
~ npm run dev
````
