import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import {ShoppingMall, Item} from './classes';
const nettopath = path.join(__dirname,'./netto.json');
const fotexpath = path.join(__dirname,'./fotex.json');
const bilkapath = path.join(__dirname,'./bilka.json'); 
 
const netto = new ShoppingMall();
const fotex = new ShoppingMall();
const bilka = new ShoppingMall();

/**
 * @description: it takes url and split it from ?, then create a obj
 * @param {queryString} url 
 */
function getQueryString(url){
    
    let queryParam2 = url.indexOf('?') !== -1 ?url.split('?')[1]:null;
    
    
    let queryObj = {};

    if(queryParam2){
        //console.log('3rd:',queryParam2.split('&'));
        let parameter = queryParam2.split('&');
            parameter.forEach((data) => {
            const key = data.split('=')[0];
            const value = data.split('=')[1];
            queryObj[key] = value;
        });
        
    }
    return queryObj;
} 

const server = http.createServer((req, res) => {
  
     //it get first part of the url before ?   
    const queryParam1 = req.url.indexOf('?') !== -1 ?req.url.split('?')[0]:req.url;
    
    //console.log('queryParamter Org', queryParam1);
    
    const storeName = queryParam1.split('/')[1];
    //console.log('store Name:', storeName);
    const storeOperation = queryParam1.split('/')[2];
    //console.log('store operation:', storeOperation);
    const getItem = getQueryString(req.url);
    
    switch (storeName) {
        
        case 'netto':

            switch (storeOperation) {
                case 'additem':
                const nettoAddItem = new Item(getItem.pId, getItem.pName, getItem.pPrice, getItem.pQuantity);
                netto.addStoreProduct(nettoAddItem, nettopath);
                
                res.writeHead(200 ,{'Content-type':'text/json'});
                res.end('Item inserted successfully');        
                break;
              
                case 'showitem':
                const nettoData = netto.showProduct(nettopath);
                res.writeHead(200, {'Content-type': 'text/JSON'});
                res.end(JSON.stringify(nettoData));
                break;


                case 'removeitem':
                
                netto.removeStoreProduct(getItem.pId, nettopath);
                res.writeHead(200 ,{'Content-type':'text/json'});
                res.end('Item has been removed ');        
                break;
                           

            }
            
            res.writeHead(200 ,{'Content-type':'text/html'});
            res.end('netto');        
            
            break;

        case 'fotex':

        switch (storeOperation) {
            case 'additem':
                const fotexAddItem = new Item(getItem.pId, getItem.pName, getItem.pPrice, getItem.pQuantity);
                fotex.addStoreProduct(fotexAddItem, fotexpath);
                
                res.writeHead(200 ,{'Content-type':'text/json'});
                res.end('Item inserted successfully');        
                break;
              
                case 'showitem':
                const fotexData = netto.showProduct(fotexpath);
                res.writeHead(200, {'Content-type': 'text/JSON'});
                res.end(JSON.stringify(fotexData));
                break;


                case 'removeitem':
                
                fotex.removeStoreProduct(getItem.pId, fotexpath);
                res.writeHead(200 ,{'Content-type':'text/json'});
                res.end('Item has been removed ');        
                break;
                           

            }
            
            res.writeHead(200 ,{'Content-type':'text/html'});
            res.end('Fotex');        
            
            break;
        
        case 'bilka':
            
        switch (storeOperation) {

            case 'additem':
            const bilkaAddItem = new Item(getItem.pId, getItem.pName, getItem.pPrice, getItem.pQuantity);
            bilka.addStoreProduct(bilkaAddItem, bilkapath);
            
            res.writeHead(200 ,{'Content-type':'text/json'});
            res.end('Item inserted successfully');        
            break;
          
            case 'showitem':
            const bilkaData = bilka.showProduct(bilkapath);
            res.writeHead(200, {'Content-type': 'text/JSON'});
            res.end(JSON.stringify(bilkaData));
            break;


            case 'removeitem':
            
            bilka.removeStoreProduct(getItem.pId, bilkapath);
            res.writeHead(200 ,{'Content-type':'text/json'});
            res.end('Item has been removed ');        
            break;
                       

        }
        
        res.writeHead(200 ,{'Content-type':'text/html'});
        res.end('Bilka');        
        
        break;
    }
});

server.listen(3000);
console.log('server listning on port 3000');
