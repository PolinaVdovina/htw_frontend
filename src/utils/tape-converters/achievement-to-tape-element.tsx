import { ITapeElementData, IBodyElement } from "../../components/tape/posts/TapeElement";
import { ParagraphInPost } from "../../components/tape/posts/post-body-elements/ParagraphInPost";
import { StatementInPost } from "../../components/tape/posts/post-body-elements/StatementsInPost";
import { ListInPost } from "../../components/tape/posts/post-body-elements/ListInPost";
import { addressGlue } from "../appliedFunc";
import { store, RootState } from "../../redux/store";
import { connect } from 'react-redux';
import { Button } from "@material-ui/core";
import React from "react";
import { RespondButton } from "../../components/cabinet/jobseeker/RespondButton";
import { ImgInPost } from "../../components/tape/posts/post-body-elements/ImgInPost";

interface IAchievement {
    id?: number,
    createdDate: string,
    title: string,
    description: string,
    files: Array<string>
}

export const achievementsToPost = (ownerLogin: string) => {
    const wrap = (achievementData: IAchievement): ITapeElementData => {
        let postBody : Array<IBodyElement> = [
            {
                Component:ParagraphInPost,
                data: {
                    description: achievementData.description
                }
            },        
        ];
        
        if (achievementData.files && achievementData.files.length > 0) {
            postBody.push(
                {
                    Component: ImgInPost,
                    data: {
                        paths: achievementData.files
                    }
                }
            )
        }
            
        
    
        return {
            createdDate: achievementData.createdDate,
            id: achievementData.id,
            title: achievementData.title,
            bottomText: achievementData.createdDate?.slice(0,10),
            body: postBody,
            ownerLogin: ownerLogin,
            
        }
    }
    return wrap;
}

export function achievementsToPostList_DONTWORK(avhievements: Array<IAchievement>, ownerLogin) {
    //return avhievements.map(avhievement => achiviementToPost(ownerLogin)(avhievement))
}