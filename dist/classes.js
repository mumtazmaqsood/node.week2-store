'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Item = exports.ShoppingMall = undefined;

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _util = require('util');

var util = _interopRequireWildcard(_util);

var _dns = require('dns');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const readStoreFile = util.promisify(fs.readFile);
const writeStoreFile = util.promisify(fs.writeFile);

class ShoppingMall {

    constructor() {
        this.productArray = [];
    }

    /**
     * @description function get json file path and read it and parse data 
     * @param {filepath} storePath 
     */
    showProduct(storePath) {
        //return fs.readFileSync(storePath , 'utf8');
        /* readStoreFile(storePath, 'utf8').then((data) => {
          this.readProductData = JSON.parse(data)});
         //console.log('showitem',this.readProductData);
         return this.readProductData;
        */ //this.readProductData = "";
        fs.readFile(storePath, 'utf8', (err, data) => {
            //if(err) throw err;
            if (!data) {
                console.log('there is not data');
            } else {
                this.readProductData = JSON.parse(data);
            }
        });
        return this.readProductData;
    }

    /**
     * @description this method enter data into selected file , it checks if there is pId & pQuantity 
     * exists, then record updated its pQuantity, otherewise it enter new item 
     * @param {array} product 
     * @param {filepath(String)} storePath 
     */
    addStoreProduct(product, storePath) {

        let appendData,
            dataExist,
            hasExist = false;

        /* this.readProductData.map(data => {
         if (product.pId === data.pId) {
             //console.log('Already Exist');
             return hasExist = false;
         }
        });   
        if (hasExist === false) {
         console.log('alreadyExist');
        }else {
         appendData = this.readProductData.map(data => `${JSON.stringify(data, null, 2)}`);
                  
         return fs.writeFile(storePath, `[${appendData.concat(JSON.stringify(product, null, 2))}] \n `,(err, data) =>{
             if(err) throw err;
             console.log('Data updated');
         });
        } */
        //Above code is working 

        //trying new code downside
        ////////////////////////////////////////////////////////////////////////

        dataExist = this.readProductData.filter((data, index) => {

            if (product.pId === data.pId && data.pQuantity >= 0) {
                data.pQuantity = parseInt(data.pQuantity) + parseInt(product.pQuantity);
                hasExist = true;
                return data;
            }
        });

        //console.log('Data exist', dataExist);
        if (hasExist === true) {
            appendData = this.readProductData.map(data => `${JSON.stringify(data, null, 2)}`);

            return fs.writeFile(storePath, `[ ${appendData}] \n `, (err, data) => {
                if (err) throw err;
                console.log('Data updated');
            });
        } else if (hasExist === false) {
            //console.log('Product Quantity need to update');
            let appendData1 = this.readProductData.map(data => `${JSON.stringify(data, null, 2)}`);
            return fs.writeFile(storePath, `[${appendData1.concat(JSON.stringify(product, null, 2))}] \n `, (err, data) => {
                if (err) throw err;
                console.log('Data updated');
            });
        }
    }
    /**
     * @description this method get product id & file path, if there is product quantity it decrease it 
     * and store in file  
     * @param {number} pId 
     * @param {f.path string} storePath 
     */
    removeStoreProduct(pId, storePath) {

        let mappedData;

        this.readProductData.filter((data, index) => {
            if (pId === data.pId && data.pQuantity > 0) {

                data.pQuantity--;
                return data;
            } else if (data.pQuantity <= 0) {
                console.log('there is not data');
            }
        });

        mappedData = this.readProductData.map(data => `${JSON.stringify(data, null, 2)}`);

        return fs.writeFile(storePath, `[ ${mappedData}] \n `, (err, data) => {
            if (err) throw err;
            console.log('Data updated');
        });
    }

    searchStoreProduct() {}

}

exports.ShoppingMall = ShoppingMall; /** this class used for getting items by user */

class Item {
    constructor(pId, pName, pPrice, pQuantity) {

        this.pId = pId;
        this.pName = pName;
        this.pPrice = pPrice;
        this.pQuantity = pQuantity;
    }
}

exports.Item = Item;
class Fotex extends ShoppingMall {}

class Netto extends ShoppingMall {}

class Bilka extends ShoppingMall {}

/* const netto = new ShoppingMall();
const addItem = new Item(1,'cola', 12, 2);
const addItem2 = new Item(1,'cola', 12, 2);
netto.addStoreProduct(addItem);
netto.addStoreProduct(addItem2);
console.log(netto.productArray); */
//# sourceMappingURL=classes.js.map