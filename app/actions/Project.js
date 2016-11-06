import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECT = 'GET_PROJECT';
export const EDIT_PROJECT = 'EDIT_PROJECT';
export const SUBSCRIBE_PROJECT = 'SUBSCRIBE_PROJECT';

export function createProject(project) {
    return Fetch({
        loading: getLoadingFunction(CREATE_PROJECT),
        loaded: getLoadedFunction(CREATE_PROJECT),
        url: 'api/project/',
        method: 'POST',
        body: project
    });
}

export function getProjects() {
    return Fetch({
        loading: getLoadingFunction(GET_PROJECTS),
        loaded: getLoadedFunction(GET_PROJECTS),
        url: 'api/project/',
        method: 'GET'
    }); 
}

export function getProject(id) {
    return Fetch({
        loading: getLoadingFunction(GET_PROJECT),
        loaded: getLoadedFunction(GET_PROJECT),
        url: 'api/project/' + id,
        method: 'GET'
    });
}

export function editProject(project, id){
    return Fetch({
        loading: getLoadingFunction(EDIT_PROJECT),
        loaded: getLoadedFunction(EDIT_PROJECT),
        url: 'api/project/',
        method: 'PUT',
        body: {
            ...project,
            _id: id
        }
    });
}

export function subscribe(projectId, userId){
    return Fetch({
        loading: getLoadingFunction(SUBSCRIBE_PROJECT),
        loaded: getLoadedFunction(SUBSCRIBE_PROJECT),
        url: 'api/project/register',
        method: 'PUT',
        body: {
            userId: userId,
            _id: projectId
        }
    });
}
