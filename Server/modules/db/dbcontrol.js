/**
 * File Name: dbcontrol.js,
 * Author: Clarice Technologies,
 * Date Created: 29th Nov 2014,
 * Description: This file is hook files those are having control over different model.
 */

//Exporting user model
exports = module.exports = function(moduleFile){
  moduleFile = moduleFile ? moduleFile: 'all';
  return require('./'+moduleFile);
};