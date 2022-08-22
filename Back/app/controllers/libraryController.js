const Library = require('../models/Library');
const Book = require('../models/Book');
const User = require('../models/User');
const Loan = require('../models/Loan');
const ClientError = require('../errors/clientError');

const libraryController = {
    async getMyLibrary(req, res) {
        // Récupérer toutes les infos personnelles de librairie d'un utilisateur
        const id = Number(req.user.id);
        const user = await User.getProfileInformations(id);
        const library = await Library.findSome('user_id', id);
        const books = await Book.getBooksByLibraryId(library[0].id);
        // Emprunts utilisateur
        const borrow = await Loan.findSome('user_id', id);
        // Prêts utilisateur
        const lend = await Loan.findSome('library_id', library[0].id);
        res.json({
            user,
            books,
            borrow,
            lend,
        });
    },

    async addBookInLibrary(req, res) {
        // Ajouter un livre à la librairie d'un utilisateur
        // Récupération du googleApiId
        const { googleApiId } = req.body;
        // Récupération du userId
        const userId = Number(req.user.id);

        // Vérifier si le livre existe déjà en BDD
        const book = await Book.findSome('google_api_id', googleApiId);
        let bookId;
        if (book.length === 0) {
            const newBook = new Book(googleApiId);
            const insertedBook = await newBook.insert();
            bookId = insertedBook.id;
        } else {
            bookId = book.id;
        }

        // Création d'une nouvelle entrée en librairie
        const newLibrary = new Library({
            user_id: userId,
            book_id: bookId,
        });
        const insertedLibrary = await newLibrary.insert();
        res.json(insertedLibrary);
    },

    async updateBookInLibrary(req, res) {
        // Modifier le status d'un livre dans la librairie de l'utilisateur
        // Récupération de l'id de l'entrée en librairie
        const libraryId = Number(req.params.id);
        // Récupération de l'information isAvailable
        const { isAvailable } = req.body;

        // Vérifier si l'entrée en librairie existe bien
        const library = await Library.findByPk(libraryId);
        if (!library) {
            throw new ClientError('This library does not exist');
        }

        // Modification de la librairie
        const updatedLibrary = await Library.update(isAvailable, libraryId);

        res.json(updatedLibrary);
    },

    async deleteBookFromLibrary(req, res) {
        // Supprimer livre de la librairie de l'utilisateur
        // Récupération de l'id de l'entrée en librairie
        const libraryId = Number(req.params.id);
        // Vérifier que l'entrée existe bien
        const library = await Library.findByPk(libraryId);
        if (!library) {
            throw new ClientError('This library does not exist');
        }
        await Library.delete(libraryId);
        res.status(200).json('Library deleted');
    },

    async getLibrary(req, res) {
        // Récupérer les infos de librairie d'un autre utiliateur
        const { username } = req.params;
        const library = await Library.getUserLibraryDetails(username);
        res.json(library);
    },
};

module.exports = libraryController;
