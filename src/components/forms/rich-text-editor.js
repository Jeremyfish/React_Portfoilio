import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export default class RichTextEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState : EditorState.createEmpty()
        }


        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }

    onEditorStateChange(editorState) {
        this.setState(
          { editorState },
          this.props.handleTextEditorChange(
            draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
          )
        );
      }


    render() {
        return (
            <div>
                <h1>
                    <Editor
                    esitorState= {this.state.editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    />
                </h1>
            </div>
        )
    }

}