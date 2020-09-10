import { ITapeElementData, IBodyElement } from "../../components/tape/posts/TapeElement";
import { ParagraphInPost } from "../../components/tape/posts/post-body-elements/ParagraphInPost";
import { StatementInPost } from "../../components/tape/posts/post-body-elements/StatementsInPost";
import { ListInPost } from "../../components/tape/posts/post-body-elements/ListInPost";
import { addressGlue } from "../appliedFunc";
import { store, RootState } from "../../redux/store";
import { connect } from 'react-redux';
import { Button } from "@material-ui/core";
import React from "react";
import { RespondButton } from "../../components/cabinet/employer/RespondButton";

interface IAchievement {
    id?: number,
    createdDate: string,
    title: string,
    description: string
}

export function achievementsToPost(achievementData: IAchievement): ITapeElementData {
    let postBody : Array<IBodyElement> = [
        {
            Component:ParagraphInPost,
            data: {
                description: achievementData.description
            }
        },   
        {
            Component:ParagraphInPost,
            data: {
                description: achievementData.title
            }
        },      
    ];
    
    return {
        createdDate: achievementData.createdDate,
        id: achievementData.id,
        title: achievementData.title,
        //ownerLogin: achievementData.login,
        bottomText: achievementData.createdDate?.slice(0,10),
        body: postBody,
    }
}

export function achievementsToPostList(avhievements: Array<IAchievement>) {
    return avhievements.map(avhievement => achievementsToPost(avhievement))
}