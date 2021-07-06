const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
const { __ } = wp.i18n;
const {
    PanelBody,
    TextControl,
} = wp.components;

const { withSelect, withDispatch } = wp.data;

let PluginMetaFields = ( props ) => {
    return(
        <>
            <PanelBody
                title={ __( 'Posts Meta Fields', 'wp-gutenberg-sidebar' ) }
                icon="admin-post"
                initialOpen={ true }
            >
                <TextControl
                    value={ props.text_field }
                    label={ __( 'Text Meta Field', 'wp-gutenberg-sidebar' ) }
                    onChange={ ( value ) => props.onTextFieldChange( value ) }
                />
            </PanelBody>
        </>
    )
}

// Trigger withSelect.
PluginMetaFields = withSelect(
    ( select ) => {
        return {
            text_field: select( 'core/editor' ).getEditedPostAttribute('meta')['_prefix_text_field']
        }
    }
)(PluginMetaFields);

// Trigger withDispatch.
PluginMetaFields = withDispatch(
    ( dispatch ) => {
        return {
            onTextFieldChange: ( value ) => {
                dispatch('core/editor').editPost({ meta: { _prefix_text_field: value }})
            }
        }
    }
)(PluginMetaFields);

registerPlugin( 'prefix-gutenberg-sidebar', {
    icon: 'smiley',
    render: () => {
        return(
            <>
                <PluginSidebarMoreMenuItem
                    target="prefix-gutenberg-sidebar"
                >
                    { __( 'WP Gutenberg Sidebar', 'wp-gutenberg-sidebar' ) }
                </PluginSidebarMoreMenuItem>
                <PluginSidebar
                    name="prefix-gutenberg-sidebar"
                    title={ __( 'Meta Options', 'wp-gutenberg-sidebar' ) }
                >
                    <PluginMetaFields />
                </PluginSidebar>
            </>
        )
    }
} );