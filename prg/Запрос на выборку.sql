SELECT book.TitleBook, publisher.TitlePublisher, author.FirstName, author.LastName, genre.NameGenre, type.type
FROM  book, publisher, author, genre, type
where book.Publisher_Id=publisher.IdPublisher
and book.Author_Id=author.IdAuthor
and book.Genre_Id=genre.IdGenre
and book.Type_Id=type.type_id