import React from 'react';
import {IntlProvider} from 'react-intl';
import TestUtils from 'react-dom/test-utils';
import {ROLE} from "../../../js/constants/DefaultConstants";
import Dashboard from "../../../js/components/dashboard/Dashboard";
import enLang from '../../../js/i18n/en';

describe('Dashboard', function () {
    const intlData = enLang;
    let currentUserAdmin = {
            username: 'test',
            role: ROLE.ADMIN,
            firstName: 'testName'
        },
        doctorWithInstitution = {
            username: 'test',
            role: ROLE.DOCTOR,
            institution: {key: 12345678}
        },
        doctorWithoutInstitution = {
            username: 'test',
            role: ROLE.DOCTOR
        },
        handlers = {
            showUsers: jasmine.createSpy('showUsers'),
            showInstitutions: jasmine.createSpy('showInstitutions'),
            showRecords: jasmine.createSpy('showRecords'),
            createRecord: jasmine.createSpy('createRecord'),
            showMyInstitution: jasmine.createSpy('showMyInstitution'),
            showMyProfile: jasmine.createSpy('showMyProfile'),
            showStatistics: jasmine.createSpy('showStatistics')
        };

    it('renders dashboard with title and four buttons', function () {
        const tree = TestUtils.renderIntoDocument(
            <IntlProvider locale="en" {...intlData}>
                <Dashboard currentUser={currentUserAdmin} handlers={handlers}/>
            </IntlProvider>);
        const title = TestUtils.findRenderedDOMComponentWithClass(tree, "formatted-message-size");
        expect(title).not.toBeNull();

        const name = TestUtils.findRenderedDOMComponentWithClass(tree, "bold");
        expect(name.textContent).toEqual(currentUserAdmin.firstName);

        const container = TestUtils.findRenderedDOMComponentWithClass(tree, "container");
        expect(container).not.toBeNull();

        const jumbotron = TestUtils.findRenderedDOMComponentWithClass(tree, "jumbotron");
        expect(jumbotron).not.toBeNull();

        const cols = TestUtils.scryRenderedDOMComponentsWithClass(tree, "dashboard-sector");
        expect(cols.length).toEqual(5);
    });

    it('renders four buttons to admin and click on them', function () {
        const tree = TestUtils.renderIntoDocument(
            <IntlProvider locale="en" {...intlData}>
                <Dashboard currentUser={currentUserAdmin} handlers={handlers}/>
            </IntlProvider>);
        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(tree, "button");
        expect(buttons.length).toEqual(5);

        TestUtils.Simulate.click(buttons[0]); // Create record
        expect(handlers.createRecord).toHaveBeenCalled();

        TestUtils.Simulate.click(buttons[1]); // View users
        expect(handlers.showUsers).toHaveBeenCalled();

        TestUtils.Simulate.click(buttons[2]); // View institutions
        expect(handlers.showInstitutions).toHaveBeenCalled();

        TestUtils.Simulate.click(buttons[3]); // View patients records
        expect(handlers.showRecords).toHaveBeenCalled();

        TestUtils.Simulate.click(buttons[4]); // View statistics
        expect(handlers.showStatistics).toHaveBeenCalled();
    });

    it('renders four buttons to doctor with institution and click on them', function () {
        const tree = TestUtils.renderIntoDocument(
            <IntlProvider locale="en" {...intlData}>
                <Dashboard currentUser={doctorWithInstitution} handlers={handlers}/>
            </IntlProvider>);
        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(tree, "button");
        expect(buttons.length).toEqual(4);

        TestUtils.Simulate.click(buttons[0]); // Create record
        expect(handlers.createRecord).toHaveBeenCalled();

        TestUtils.Simulate.click(buttons[1]); // View my profile
        expect(handlers.showMyProfile).toHaveBeenCalled();

        TestUtils.Simulate.click(buttons[2]); // View my institution
        expect(handlers.showMyInstitution).toHaveBeenCalled();

        TestUtils.Simulate.click(buttons[3]); // View patients records
        expect(handlers.showRecords).toHaveBeenCalled();
    });

    it('renders three buttons to doctor without institution and click on them', function () {
        const tree = TestUtils.renderIntoDocument(
            <IntlProvider locale="en" {...intlData}>
                <Dashboard currentUser={doctorWithoutInstitution} handlers={handlers}/>
            </IntlProvider>);
        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(tree, "button");
        expect(buttons.length).toEqual(3);

        TestUtils.Simulate.click(buttons[0]); // Create record
        expect(handlers.createRecord).toHaveBeenCalled();

        TestUtils.Simulate.click(buttons[1]); // View my profile
        expect(handlers.showMyProfile).toHaveBeenCalled();

        TestUtils.Simulate.click(buttons[2]); // View patients records
        expect(handlers.showRecords).toHaveBeenCalled();
    });
});