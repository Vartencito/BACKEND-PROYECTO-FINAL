USE [master]
GO
/****** Object:  Database [MyArtBD]    Script Date: 22/6/2022 21:12:57 ******/
CREATE DATABASE [MyArtBD]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MyArtBD', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\MyArtBD.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MyArtBD_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\MyArtBD_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [MyArtBD] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MyArtBD].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MyArtBD] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MyArtBD] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MyArtBD] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MyArtBD] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MyArtBD] SET ARITHABORT OFF 
GO
ALTER DATABASE [MyArtBD] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [MyArtBD] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MyArtBD] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MyArtBD] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MyArtBD] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MyArtBD] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MyArtBD] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MyArtBD] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MyArtBD] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MyArtBD] SET  ENABLE_BROKER 
GO
ALTER DATABASE [MyArtBD] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MyArtBD] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MyArtBD] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MyArtBD] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MyArtBD] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MyArtBD] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MyArtBD] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MyArtBD] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [MyArtBD] SET  MULTI_USER 
GO
ALTER DATABASE [MyArtBD] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MyArtBD] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MyArtBD] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MyArtBD] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MyArtBD] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [MyArtBD] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [MyArtBD] SET QUERY_STORE = OFF
GO
USE [MyArtBD]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 22/6/2022 21:12:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[text] [varchar](max) NOT NULL,
	[created_at] [datetime] NOT NULL,
	[fkUser] [int] NOT NULL,
	[fkPublication] [int] NOT NULL,
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Follows]    Script Date: 22/6/2022 21:12:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Follows](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[fkUser] [int] NOT NULL,
	[followed] [int] NOT NULL,
	[state] [bit] NOT NULL,
 CONSTRAINT [PK_Follows] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LikeOrDislike]    Script Date: 22/6/2022 21:12:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LikeOrDislike](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[fkUser] [int] NOT NULL,
	[fkPublication] [int] NOT NULL,
	[stateLike] [bit] NOT NULL,
	[stateDislike] [bit] NOT NULL,
 CONSTRAINT [PK_Like] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Publication]    Script Date: 22/6/2022 21:12:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Publication](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[image] [varchar](255) NOT NULL,
	[created_at] [datetime] NOT NULL,
	[fkUser] [int] NOT NULL,
	[description] [varchar](max) NULL,
 CONSTRAINT [PK_Publication] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 22/6/2022 21:12:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[lastName] [varchar](50) NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[cellphone] [varchar](50) NULL,
	[mail] [varchar](50) NOT NULL,
	[description] [text] NULL,
	[profilePicture] [varchar](255) NULL,
	[created_at] [datetime] NULL,
	[premium] [bit] NOT NULL,
	[occupation] [varchar](50) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Comment] ON 

INSERT [dbo].[Comment] ([Id], [text], [created_at], [fkUser], [fkPublication]) VALUES (1, N'comentario1', CAST(N'2022-06-19T13:53:42.000' AS DateTime), 2, 9)
INSERT [dbo].[Comment] ([Id], [text], [created_at], [fkUser], [fkPublication]) VALUES (3, N'comentario2', CAST(N'2022-06-19T16:52:28.000' AS DateTime), 1, 2)
INSERT [dbo].[Comment] ([Id], [text], [created_at], [fkUser], [fkPublication]) VALUES (4, N'comentario3', CAST(N'2022-06-19T15:22:52.000' AS DateTime), 5, 7)
SET IDENTITY_INSERT [dbo].[Comment] OFF
GO
SET IDENTITY_INSERT [dbo].[LikeOrDislike] ON 

INSERT [dbo].[LikeOrDislike] ([Id], [fkUser], [fkPublication], [stateLike], [stateDislike]) VALUES (1, 3, 9, 1, 0)
INSERT [dbo].[LikeOrDislike] ([Id], [fkUser], [fkPublication], [stateLike], [stateDislike]) VALUES (2, 1, 2, 1, 0)
INSERT [dbo].[LikeOrDislike] ([Id], [fkUser], [fkPublication], [stateLike], [stateDislike]) VALUES (4, 2, 7, 0, 1)
INSERT [dbo].[LikeOrDislike] ([Id], [fkUser], [fkPublication], [stateLike], [stateDislike]) VALUES (5, 5, 2, 1, 0)
INSERT [dbo].[LikeOrDislike] ([Id], [fkUser], [fkPublication], [stateLike], [stateDislike]) VALUES (6, 3, 2, 1, 0)
INSERT [dbo].[LikeOrDislike] ([Id], [fkUser], [fkPublication], [stateLike], [stateDislike]) VALUES (7, 1, 9, 0, 1)
INSERT [dbo].[LikeOrDislike] ([Id], [fkUser], [fkPublication], [stateLike], [stateDislike]) VALUES (8, 2, 9, 0, 1)
SET IDENTITY_INSERT [dbo].[LikeOrDislike] OFF
GO
SET IDENTITY_INSERT [dbo].[Publication] ON 

INSERT [dbo].[Publication] ([Id], [name], [image], [created_at], [fkUser], [description]) VALUES (2, N'imagen1', N'https://i.imgur.com/hyxsJXf_d.webp?maxwidth=520&shape=thumb&fidelity=high', CAST(N'2022-06-19T15:22:52.000' AS DateTime), 3, N'descripcion1')
INSERT [dbo].[Publication] ([Id], [name], [image], [created_at], [fkUser], [description]) VALUES (7, N'imagen3', N'https://i.imgur.com/aIqL2SO_d.webp?maxwidth=520&shape=thumb&fidelity=high', CAST(N'2022-06-19T15:26:49.000' AS DateTime), 2, N'descripcion2')
INSERT [dbo].[Publication] ([Id], [name], [image], [created_at], [fkUser], [description]) VALUES (9, N'imagen4', N'https://i.imgur.com/bkziQqr_d.webp?maxwidth=520&shape=thumb&fidelity=high', CAST(N'2022-06-19T15:22:52.000' AS DateTime), 2, N'descripcion3')
INSERT [dbo].[Publication] ([Id], [name], [image], [created_at], [fkUser], [description]) VALUES (12, N'imagen7', N'https://i.imgur.com/P4lF2PB_d.webp?maxwidth=520&shape=thumb&fidelity=high', CAST(N'2022-06-19T16:00:48.000' AS DateTime), 6, N'descripcion4')
INSERT [dbo].[Publication] ([Id], [name], [image], [created_at], [fkUser], [description]) VALUES (13, N'imagen8', N'https://i.imgur.com/zlFnpMZ_d.webp?maxwidth=520&shape=thumb&fidelity=high', CAST(N'1905-06-21T00:00:00.000' AS DateTime), 1, N'descripcion5')
INSERT [dbo].[Publication] ([Id], [name], [image], [created_at], [fkUser], [description]) VALUES (14, N'imagen9', N'https://i.imgur.com/zlFnpMZ_d.webp?maxwidth=520&shape=thumb&fidelity=high', CAST(N'2022-06-22T19:36:24.000' AS DateTime), 6, N'descripcion6')
SET IDENTITY_INSERT [dbo].[Publication] OFF
GO
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([Id], [name], [lastName], [username], [password], [cellphone], [mail], [description], [profilePicture], [created_at], [premium], [occupation]) VALUES (1, N'nombre1A', N'apellido1A', N'usuario1A', N'contraseña1A', N'cellphone1A', N'ejemplo1A@gmail.com', N'descripcion1A', N'https://i.imgur.com/dkKqkx9.jpeg', CAST(N'2022-06-19T15:22:52.000' AS DateTime), 1, N'ocupacion1A')
INSERT [dbo].[User] ([Id], [name], [lastName], [username], [password], [cellphone], [mail], [description], [profilePicture], [created_at], [premium], [occupation]) VALUES (2, N'nombre2', N'apellido2', N'usuario2', N'contraseña2', N'cellphone2', N'ejemplo2@gmail.com', N'descripcion2', N'pfp2', CAST(N'2022-06-19T15:22:52.000' AS DateTime), 1, N'ocupacion2')
INSERT [dbo].[User] ([Id], [name], [lastName], [username], [password], [cellphone], [mail], [description], [profilePicture], [created_at], [premium], [occupation]) VALUES (3, N'nombre3', N'apellido3', N'usuario3', N'contraseña3', N'cellphone3', N'ejemplo3@gmail.com', N'descripcion3', N'pfp3', CAST(N'2022-06-19T15:26:49.000' AS DateTime), 0, N'ocupacion3')
INSERT [dbo].[User] ([Id], [name], [lastName], [username], [password], [cellphone], [mail], [description], [profilePicture], [created_at], [premium], [occupation]) VALUES (5, N'nombre4', N'apellido4', N'usuario4', N'contraseña4', N'cellphone4', N'ejemplo4@gmail.com', N'descripcion4', N'pfp4', CAST(N'2022-06-19T16:52:28.000' AS DateTime), 1, N'ocupacion4')
INSERT [dbo].[User] ([Id], [name], [lastName], [username], [password], [cellphone], [mail], [description], [profilePicture], [created_at], [premium], [occupation]) VALUES (6, N'nombre5', N'apellido5', N'usuario5', N'contraseña5', N'cellphone5', N'ejemplo5@gmail.com', N'descripcion5', N'pfp5', CAST(N'2022-06-19T13:53:42.000' AS DateTime), 0, N'ocupacion5')
SET IDENTITY_INSERT [dbo].[User] OFF
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Publication] FOREIGN KEY([fkPublication])
REFERENCES [dbo].[Publication] ([Id])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_Publication]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_User] FOREIGN KEY([fkUser])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_User]
GO
ALTER TABLE [dbo].[Follows]  WITH CHECK ADD  CONSTRAINT [FK_Follows_User] FOREIGN KEY([fkUser])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Follows] CHECK CONSTRAINT [FK_Follows_User]
GO
ALTER TABLE [dbo].[Follows]  WITH CHECK ADD  CONSTRAINT [FK_Follows_User1] FOREIGN KEY([followed])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Follows] CHECK CONSTRAINT [FK_Follows_User1]
GO
ALTER TABLE [dbo].[LikeOrDislike]  WITH CHECK ADD  CONSTRAINT [FK_LikeOrDislike_Publication] FOREIGN KEY([fkPublication])
REFERENCES [dbo].[Publication] ([Id])
GO
ALTER TABLE [dbo].[LikeOrDislike] CHECK CONSTRAINT [FK_LikeOrDislike_Publication]
GO
ALTER TABLE [dbo].[LikeOrDislike]  WITH CHECK ADD  CONSTRAINT [FK_LikeOrDislike_User] FOREIGN KEY([fkUser])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[LikeOrDislike] CHECK CONSTRAINT [FK_LikeOrDislike_User]
GO
ALTER TABLE [dbo].[Publication]  WITH CHECK ADD  CONSTRAINT [FK_Publication_User] FOREIGN KEY([fkUser])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Publication] CHECK CONSTRAINT [FK_Publication_User]
GO
USE [master]
GO
ALTER DATABASE [MyArtBD] SET  READ_WRITE 
GO
