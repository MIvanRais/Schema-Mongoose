const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/library-service')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxlength: [25, 'Title cannot exceed 25 characters'],
        trim: true,
    },
    isbn: {
        type: String,
        required: [true, 'Isbn is required'],
        minlength: [10, 'Isbn must be at least 10 characters'],
        maxlength: [13, 'Isbn cannot exceed 13 characters'],
        trim: true,
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        min: [1, 'Stock must be at least 1'],
        validate: {
            validator: Number.isInteger,
            message: 'Stock must be a whole number'
        },
    },
    author: [{
        type: String,
        required: [true, 'Author is required'],
        maxlength: [20, 'Author cannot exceed 20 characters'],
        trim: true
    }]
})

const librarySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Library name is required'],
        maxlength: [50, 'Library name cannot exceed 50 characters'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        maxlength: [100, 'Address cannot exceed 100 characters'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: 'Please enter a valid email address'
        },
        trim: true,
        unique: [true, 'This email is already in use. Please choose another.']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function (v) {
                return /^(\+62|0)[2-9]{1}[0-9]{7,11}$/.test(v);
                // +62 or 0 followed by digits, with 9 to 13 digits in total
            },
            message: 'Please enter a valid Indonesian phone number'
        },
        trim: true,
        unique: [true, 'This phone number is already in use. Please choose another.']
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});


const Book = mongoose.model('Book', bookSchema);
const Library = mongoose.model('Library', librarySchema);

// ** add books
// const laskarPelangi = new Book({ title: 'Laskar Pelangi', isbn: '979-3062-79-7', stock: 10, author: ['Andrea Hirata'] });
// laskarPelangi.save()
//     .then(data => {
//         console.log('IT WORKED!');
//         console.log(data);
//     })

// ! Validation error encountered
// const jakarta = new Book({ title: 'Jakarta! Jakarta!', isbn: '978-979-9026-34-2', stock: 10, author: ['Putu Wijaya'] });
// jakarta.save()
//     .then(data => {
//         console.log('IT WORKED!');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('OHH NOO ERROR!');
//         console.log(err.errors.isbn.message);
//     })

// Book.insertMany([
//     { title: 'Bumi Manusia', isbn: '979-97312-7-8', stock: 15, author: ['Pramoedya Ananta'] },
//     { title: 'Negeri 5 Menara', isbn: '978-979-22-45', stock: 3, author: ['Ahmad Fuadi'] },
//     { title: 'Lintang Kemukus Dini Hari', isbn: '978-979-9104', stock: 8, author: ['Ayu Utami', 'Leila S. Chudori'] },
//     { title: 'Lontar Anthology', isbn: '978-602-9144', stock: 8, author: ['Goenawan Mohamad', 'Seno Gumira Ajidarma', 'et al'] },
// ])
//     .then(data => {
//         console.log("IT WORKED!");
//         console.log(data);
//     })

// ** find book
// Book.findOne({ title: 'Lontar Anthology' })
//     .then(data => {
//         console.log('IT WORKED!');
//         console.log(data);
//     })

// ** update stock of book
// Book.findOneAndUpdate({ _id: '66da00167eeef097edc7e69d' }, { stock: 6 }, { new: true })
//     .then(data => {
//         console.log('IT WORKED!');
//         console.log(data);
//     })

// ** delete book
// Book.deleteOne({ _id: '66da00167eeef097edc7e69d' })
//     .then(data => {
//         console.log('IT WORKED!');
//         console.log(data);
//     })

// ** add library
// const perpusnas = new Library({ name: 'Perpustakaan Nasional', address: 'Jl. Medan Merdeka Selatan No.11, Jakarta 10110', email: 'persuratan@perpusnas.go.id', phoneNumber: '085717147303' });
// perpusnas.save()
//     .then(data => {
//         console.log('IT WORKED!');
//         console.log(data);
//     })

// ** add a new book to the library
// const addBook = async () => {
//     const library = await Library.findOne({ name: 'Perpustakaan Nasional' });
//     const book = new Book({ title: 'Urbanisme Pinggiran', isbn: '978-979-3065', stock: 15, author: ['Nirwan Dewanto'] });
//     await book.save();
//     library.books.push(book._id);
//     await library.save();
// }

// addBook();

// ** find library and populate books field
// const findLibrary = async () => {
//     const t = await Library.findOne({ name: 'Perpustakaan Nasional' }).populate('books');
//     console.log(t);
// }

// findLibrary();