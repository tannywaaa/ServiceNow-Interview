# Overview

This repository includes all files for ServiceNow Coding Test.

Files mostly modified: App.js, App.css, componments/cars.js, componments/table_by_state.js

## Installation

Download the folder

```bash
git clone https://github.com/tannywaaa/ServiceNow-Interview.git
```
Install Reactjs package

```bash
npm install
npm start
```

To Home Page: 
```bash
http://localhost:8082/
```
## Re-useable Components

There are 2 files in src/componments called card.js and table_by_state.js.

card.js is a componment that is used to create cards on top of the page. To use it, simply have 

```bash
<Card title={"title"} number={"body"} />
```

![card componment](https://user-images.githubusercontent.com/29969808/80443781-debb3600-88c4-11ea-984d-410ff0e3f294.png)

table_by_state.js is a componments that is used to create table sorted by state. To use it, simply have 

```bash
<TableByState state={"State Name"} />
```
![table_by_state componment](https://user-images.githubusercontent.com/29969808/80444109-af58f900-88c5-11ea-82d3-7108950d150f.png)

## Developer Tools Used

Framework: ReactJS

Libries: Bootstrap

## Bonus

1. This app has the same theme as provided, and they look very similar

2. State Management: 
 o What happens if your components/pages are loading?
o What if there’s an error communicating with the server?
o What if fetches return empty?

3. New Incident: STRY0002: As an IT service agent, I would like to be able to open a new
incident, in case something new has been reported. Details see from explaination video: 

