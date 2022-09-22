'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { query } = ctx;
    const results = await ctx.service.home.readAll();
    const comments = JSON.parse(JSON.stringify(results));
    // console.log(comments);
    
    await this.ctx.render('home.njk', {comments: comments});
    
  }

  async createPost() {
    
    const { ctx } = this;
    const { request: { body } } = ctx;
    console.log(body.name);
    // ctx.body = 'hi, post';

    const result = await ctx.service.home.create(body.name, body.message);
    ctx.body = result;
    
    ctx.redirect('/');
  }

  async updatePage() {
    
    const { ctx } = this;
    const { query } = ctx;
    // console.log(query);
    const result = await ctx.service.home.readById(parseInt(query.id, 10));
    // console.log(result)
    const comment = JSON.parse(JSON.stringify(result));
    // console.log(comment);
    // ctx.body = 'hi, poster';
    await this.ctx.render('update.njk', comment);
    
  }

  async updatePost() {
    
    const { ctx } = this;
    const { request: { body } } = ctx;
    console.log(body);
    // ctx.body = 'hi, post';

    const result = await ctx.service.home.update(body.id, body.name, body.message);
    ctx.body = result;
    
    ctx.redirect('/');
  }

  async deletePost() {
    
    const { ctx } = this;
    const { query } = ctx;

    const result = await ctx.service.home.delete(query.id);
    console.log(result);
    ctx.body = result;
    
    ctx.redirect('/');
  }
}

module.exports = HomeController;
