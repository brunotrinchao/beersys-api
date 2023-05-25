export default function (plop) {
    // controller generator
    plop.setGenerator('Endpoint completo', {
        description: 'Gerar um endpoint completo (router, model, controller)',
        prompts: [
            {
            type: 'input',
            name: 'name',
            message: 'Informe o nome do endpoint:'
            },
            {
            type: 'input',
            name: 'tabela',
            message: 'Informe o nome da tabela:'
            }
        ],
        actions: [
            {
                type: 'add',
                skipIfExists: true,
                path: 'src/routes/{{pascalCase name}}.js',
                templateFile: 'plop-templates/routes.hbs' 
            },
            {
                type: 'add',
                skipIfExists: true,
                path: 'src/models/{{pascalCase name}}.js',
                templateFile: 'plop-templates/model.hbs' 
            },
            {
                type: 'add',
                skipIfExists: true,
                path: 'src/controllers/{{pascalCase name}}.js',
                templateFile: 'plop-templates/controller.hbs' 
            },
            {
                type: 'add',
                skipIfExists: true,
                path: 'src/services/{{pascalCase name}}.js',
                templateFile: 'plop-templates/service.hbs' 
            },
            {
                path: './src/routes.js',
                unique: true,
                pattern: /(\/\/ IMPORTA ROTAS)/g,
                templateFile: 'plop-templates/importa-rota.hbs',
                type: 'append',
            },
        ]
    });
};