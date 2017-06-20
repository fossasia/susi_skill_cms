/**
 * Created by saurabh on 19/6/17.
 */
module.exports = [
    {
        key: 'home',
        name: 'Home page',
        icon: 'home'
    },
    {
        key: 'test1',
        name: 'test',
        icon: 'setting',
        child: [
            {
                key: "test2",
                name: 'Test Navigation 1'
            },
            {
                key: "test3",
                name: 'Test Navigation 2',
                child: [
                    {
                        key: "test3",
                        name: 'Test Navigation 3'
                    },
                ],
            }
        ]
    }
]