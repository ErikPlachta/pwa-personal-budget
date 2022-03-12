//------------------------------------------------------------------------------
const router = require('express').Router();
const { WebUser } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');


//------------------------------------------------------------------------------
//-- ROUTES

// //-- GET all POSTS for homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage');
    // Get all Posts
    // const postData = await Post.findAll({ 
    //   // limit: 10,
    //   order: [
    //     ['created_date', 'DESC']
    //   ],
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['id','username','created_date'],
    //     },
    //     {
    //       model: Resource,
    //       attributes: ['user_id','title','url'],
    //     }
    //   ],
    // });
    // // Build it to prepare for html
    // const posts = postData.map((post) =>
    //   post.get({ plain: true })
    // );

    // Get all Comments
    // const commentData = await Comment.findAll({ 
    //   // limit: 10,
    //   order: [
    //     ['created_date', 'DESC']
    //   ],
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['id','username','created_date'],
    //     },
    //     {
    //       model: Post,
    //       attributes: ['id','title'],
    //     }
    //   ],
    // });

    // const comments = commentData.map((post) =>
    //   post.get({ plain: true })
    // );
    
    //-- if logged in, grab user data to build navbar with their info in it
    // if(req.session.loggedIn){
    // //   const dbUserData = await User.findOne({
    // //     attributes: { exclude: ['password','name'] }, /* no passwords*/
    // //     where: { id: req.session.user_id }, 
    // //   });
    // //   //-- building active-user data
    // //   const activeUserData = dbUserData.get({ plain: true });
    // //   //-- render homepage with user session data
    // //   res.render('homepage', {
    // //     activeUserData,
    // //     comments,
    // //     posts,
    // //     loggedIn: req.session.loggedIn,
    // //     username: req.sessionID.username
    // //   });
    // }
    
    //-- if not logged in, just basic nav
    // if(!req.session.loggedIn){
    //   res.render('homepage', {
    //     // comments,
    //     // posts
    //   });
    // }
  } 
  
  catch (err) {  
    res
      .status(500)
      .json({
        response: {
          status: 500,
          error: String(err)
        }
      });
  }
});

// router.get('/login', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }
  
//   res.render('login');
// });

// router.get('/profile', withAuth, async (req, res) => {
  
//   //-- get user data
//   const dbUserData = await User.findAll({
//     attributes: { exclude: ['password'] }, /* no passwords*/
//      where: {id: 1}, /* TODO:: Get current user */
//     });
//   //-- building comments
//   const users = dbUserData.map((user) => user.get({ plain: true }) );

//   // GET POSTS
//   const postData = await Post.findAll({ 
//     // limit: 10,
//     order: [
//       ['created_date', 'DESC']
//     ],
//     include: [
//       {
//         model: User,
//         attributes: ['id','username','created_date'],
//       },
//       {
//         model: Resource,
//         attributes: ['user_id','title','url'],
//       }
//     ],
//   });
//   // console.log(req.session)
//   // Build it to prepare for html
//   const posts = postData.map((post) => post.get({ plain: true }));

  
//   //-- get comments related
//   const dbCommentData = await Comment.findAll({
//     where: {
//       user_id: 1,
//     },
//     include: [
//       { model: Post, attributes: ['id'], },
//     ],
//   });
//   //-- building comments
//   const comments = dbCommentData.map((post) => post.get({ plain: true }) );

//   // console.log(req.session)
//   res.render('profile', {
//     users,
//     comments,
//     posts,
//     loggedIn: req.session.loggedIn 
//   });
// });

// router.get('/post/:id', withAuth, async (req, res) => {
  
//   try {    
    
//     //-- get comments and all releated data
//     const dbCommentData = await Comment.findAll({
//       where: {
//         post_id: req.params.id,
//       },
//       include: [
//         {
//           model: Post,
//           attributes: ['id'],
//         },
//         {
//           model: User,
//           attributes: ['id','username','login_date'],
//         }
//       ],
//     });
//     const comments = dbCommentData.map((comment) => comment.get({ plain: true }) );

//   //-- get the POST data
//   const dbPostData= await Post.findOne({
//     where: { id: req.params.id },
//     include: [
//       {
//         model: User,
//         attributes: ['id','username','login_date'],
//       }
//     ],
//     });
//   //-- building comments
//   const post = dbPostData.get({ plain: true });
//     // console.log(post)
//     //-- send data
//     res.render('post', { 
//       'post': post,
//       'comments': comments,
//       loggedIn: req.session.loggedIn 
//     });
//   } 
//   catch (err) { res.render('404'); }
// });

// Bad URL send home

router.get("/*", (req, res) => {
  res.render("404")
})


module.exports = router;
