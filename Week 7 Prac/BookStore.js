/**
 * Filename: BookStore.js
 * Authors: Adeline Soerjonoto, Jason Yonothan and Michael Abdelmessih
 * Lab Time: 2:30pm - 6pm on Friday
 * Lab Teacher: Hongli Song
 * Date Created: 4/12/19
 * Date Last Modified: 4/12/19
 * 
 */

let listOfAllKnownAuthors = []

// Checks to see if authorName is in listOfAllKnownAuthors
function authorKnown(authorName)
{
    let foundThem = false;
    for (let pos = 0; pos < listOfAllKnownAuthors.length; pos++)
    {
        if (authorName === listOfAllKnownAuthors[pos])
        {
            foundThem = true
        }
    }
    return foundThem
}

// Class Definitions

class BookStore
{
    constructor(name, address, owner)
    {
        // Private Attributes
        this._name = name;
        this._address = address;
        this._owner = owner;
        this._booksAvailable = [];
        this._totalCopiesOfAllBooks = 0
    }
    
    // Public Methods

    
    // Adds a new book, and makes appropriate changes to other variables/arrays.
    addBook(bookInstance, copies)
    {
        if (1 > copies) {
            let positionOfBook = this.checkForBook(bookInstance);
            if (positionOfBook != null) // This is for when the book is already available.
            {
                 let foundBook = this._booksAvailable[positionOfBook];
                 foundBook.copies += copies;
                 console.log("Added " + copies + " copies of " + foundBook.book);
                 listOfAllKnownAuthors.push(foundBook.book.author);
            }
            else
            { // This is for when the book is NOT already available.
                 let bookCopies = {
                     book: bookInstance,
                     copies: copies 
                 };
                 this._booksAvailable.push(bookCopies);
                 console.log("Added " + copies + " copies of a new book: " + bookInstance);
            }

            this._totalCopiesOfAllBooks += copies;
        } else {
            console.log(bookInstance + " cannot be added when copies is less than 1!")
        }
    }

    // Processes the selling of a book and how it affects other variables/lists
    sellBook(bookInstance, numberSold)
    {
        let positionOfBook = this.checkForBook(bookInstance);
        if (positionOfBook != null)
        {
            let foundBook = this._booksAvailable[positionOfBook];
            console.log(numberSold)
            if (numberSold > this._booksAvailable[positionOfBook].copies || 1 > numberSold)
            {
                console.log("Not enough copies of " + foundBook.book + " to sell");
            } 
            else
            {
                foundBook.copies -= numberSold;
                if (foundBook.copies === 0) // If there are no copies of a book left, it removes the book 
                                            // and its details from all relevant arrays.
                {
                    this._booksAvailable.pop(PositionOfBook);
                    this._NumTitles -= 1;
                    let foundAuth = authorKnown(foundBook.book.author);
                    listOfAllKnownAuthors.pop(foundAuth);
                }
                this._totalCopiesOfAllBooks -= numberSold;
                console.log("Sold " + numberSold + " copies of " + foundBook.book);
            }
        }
        else
        {
            console.log(bookInstance + " not found");
        }
    }

    // Checks if a book (bookInstance) is available and returns its position in the _booksAvailable array.
    checkForBook(bookInstance)
    {
        let currBookNum = 0;
        while (currBookNum < this._booksAvailable.length)
        {
            if (this._booksAvailable[currBookNum].book.isTheSame(bookInstance))
            {
                return currBookNum;
            }
            else
            {
                return null;
            }
            currBookNum += 1;
        }
        return null;
    }

    // Accessors and Mutators
    get name()
    {
        return this._name;
    }

    set name(newName)
    {
        this._name = newName;
    }

    get address()
    {
        return this._address;
    }

    set address(newAddress)
    {
        this._address = newAddress;
    }

    get owner()
    {
        return this._owner;
    }

    set address(newOwner)
    {
        this._owner = newOwner;
    }
}

class Book
{
    constructor(title, author, publicationYear, price)
    {
        // Private attributes
        this._title = title;
        this._author = author;
        this._publicationYear = publicationYear;
        this._price = price;
        if (authorKnown(this._author) === false)
        {
            listOfAllKnownAuthors.push(this._author)
        }
    }
    
    // Public Methods
    // Checks and returns whether or not otherBook's price is the same as the book that is calling it
    isTheSame(otherBook)
    {
        return otherBook.title === this.title;
    }

    // Accessors and Mutators
    get title()
    {
        return this._title;
    }

    get author()
    {
        return this._author;
    }

    get publicationYear()
    {
        return this._publicationYear;
    }

    get price()
    {
        return this._price;
    }
    
    // Serialiser
    toString()
    {
        return this.title + ", " + this.author + ". " + this.publicationYear + " ($" + this.price + ")";
    }
}

// Book details courtesy of Harry Potter series by J.K. Rowling
let cheapSpellBook = new Book("The idiot's guide to spells","Morlan",2005,40);
let flourishAndBlotts = new BookStore("Flourish & Blotts", "North side, Diagon Alley, London, England", "unknown");
let monsterBook = new Book("The Monster Book of Monsters", "Edwardus Lima", 1978, 40);
let monsterBookToSell = new Book("The Monster Book of Monsters", "Edwardus Lima", 1978, 40);
let spellBook = new Book("The Standard Book of Spells, Grade 4", "Miranda Goshawk", 1921, 80);
flourishAndBlotts.addBook(cheapSpellBook,1000);
flourishAndBlotts.addBook(monsterBook, 500);
flourishAndBlotts.sellBook(monsterBookToSell, 200);
flourishAndBlotts.addBook(spellBook, 40);
flourishAndBlotts.addBook(spellBook, 20);
flourishAndBlotts.sellBook(spellBook, 15);
flourishAndBlotts.addBook(monsterBookToSell, -30);
flourishAndBlotts.sellBook(monsterBookToSell, 750);

console.log("Authors known: " + listOfAllKnownAuthors);
