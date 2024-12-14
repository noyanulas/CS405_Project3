/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */

        // Get the local transformation matrix for the current node
        const localTransform = this.trs.getTransformationMatrix();

        // Combine the current node's transformation with the parent's transformation
        const newModelMatrix = MatrixMult(modelMatrix, localTransform);
        const newModelView = MatrixMult(modelView, localTransform);
        const newMvp = MatrixMult(mvp, localTransform);
        const newNormalMatrix = MatrixMult(normalMatrix, localTransform); // Or appropriately derive normals

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(newMvp, newModelView, newNormalMatrix, newModelMatrix);
        }

        // Recursively draw all children
        for (const child of this.children) {
            child.draw(newMvp, newModelView, newNormalMatrix, newModelMatrix);
        }
    }


    

}