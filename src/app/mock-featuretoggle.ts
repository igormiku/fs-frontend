import { FeatureToggle } from './featuretoggle';

export const FEATURETOGGLES: FeatureToggle[] = [
    {id: 1, technicalname: 'bitbucket', displayname: 'BitBucket', description: 'Usage of BitBucket feature', inverted: false, expireson: "12123", customerids: ['1', '2']},
    {id: 2, technicalname: 'github', displayname: 'GitHb', description: 'Usage of GitHub feature', inverted: false, expireson: "12312312", customerids: ['3', '4']},
    {id: 3, technicalname: 'gitlab', displayname: 'GitLb', description: 'Usage of GitLab feature', inverted: false, expireson: "12312312", customerids: ['1', '5']}
];

