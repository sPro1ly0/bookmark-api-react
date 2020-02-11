drop table if exists bookmarks;

create table bookmarks (
    id INTEGER primary key generated by default as identity,
    title VARCHAR(30) NOT NULL,
    url VARCHAR(200) NOT NULL,
    description TEXT,
    rating INTEGER NOT NULL
);

--10 rows of data
insert into bookmarks (title, url, description, rating)
values
    ('Yummly', 'https://www.yummly.com/', 'Search for personalized recipes', 3),
    ('Edabit', 'https://edabit.com/challenges/', 'Practice coding with challenges', 4),
    ('Photos', 'https://photos.com/', 'Search and shop for photos', 3),
    ('Tasty', 'https://tasty.co/', 'Videos of receipes to follow along', 5),
    ('Example', 'https://www.example.com/', 'Blank example description', 2);

insert into bookmarks (title, url, rating)
    values
        ('Google', 'https://www.google.com/', 5),
        ('YouTube', 'https://www.youtube.com/', 5),
        ('CodePen', 'https://www.codepan.io', 4),
        ('Google Fonts', 'https://fonts.google.com/', 4),
        ('Amazon', 'https://www.amazon.com/', 3);