npm run build
git add dist/ node_modules/dialog-polyfill/dialog-polyfill.js node_modules/dialog-polyfill/dialog-polyfill.css node_modules/react-mdl/extra/material.min.css node_modules/react-mdl/extra/material.min.js -f
git commit -m "Deploy to Heroku"
git push heroku master -f
git reset head^1
