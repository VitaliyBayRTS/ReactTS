import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe("Profile status component", () => {
    test("Status from status should be in state", () => {
        let component = create(<ProfileStatus status={"Test"} updateUserStatusThunk={() => {}}/>)
        let instance: any = component.getInstance();
        expect(instance.state.status).toBe("Test");
    });

    test("After initialization <span> should be displayed", () => {
        let component = create(<ProfileStatus status={"Test"} updateUserStatusThunk={() => {}}/>)
        let root: any = component.root;
        let span = root.findByType('span')
        expect(span.props.children).toBe("Test");
    });

    test("After initialization <input> shouldn`t be displayed", () => {
        let component = create(<ProfileStatus status={"Test"} updateUserStatusThunk={() => {}}/>)
        let root: any = component.root;
        expect(() => {
            let input = root.findByType('input')
        }).toThrow();
    });

    test("After doubleClick ob <span>, <input> should be displayed", () => {
        let component = create(<ProfileStatus status={"Test"} updateUserStatusThunk={() => {}}/>)
        let root: any = component.root;
        let span = root.findByType('span')
        span.props.onDoubleClick();
        let input = root.findByType('input')
        expect(input.props.value).toBe("Test")
    });

    test("updateUserStatusThunk will be called only one time after deactivate editMode", () => {
        let mockCallback = jest.fn();
        let component = create(<ProfileStatus status={"Test"} updateUserStatusThunk={mockCallback}/>)
        let instance: any = component.getInstance();
        instance.deactiveEditMode();
        expect(mockCallback.mock.calls.length).toBe(1)
    });

    
})