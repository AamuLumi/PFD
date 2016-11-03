import Fetch from '../tools/Fetch';

export const CREATE_PROJECT = 'CREATE_PROJECT';

export function createProject(project) {
    return Fetch({
        loading: () => {
            return {
                type: CREATE_PROJECT,
                loaded: false
            };
        },
        loaded: (data) => {
            let res = {
                type: CREATE_PROJECT,
                loaded: true,
                date: Date.now(),
                data: data
            };

            if (data.success < 1){
                res.error = true;
                res.data = res.data.message;
            }

            return res;
        },
        url: 'api/project/',
        method: 'POST',
        body: project
    });
}