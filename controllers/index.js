
function indexPage(req,res){
    res.render('index', { title: 'Express' });
}

module.exports = {
  indexPage: indexPage
};
