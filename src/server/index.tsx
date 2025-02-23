import express from "express";

import cookieParser from "cookie-parser";

import {EntryFilter, ProfileFilter} from "../common/store/global/types";

import entryIndexHandler from "./handlers/entry-index";
import communityHandler from "./handlers/community";
import profileHandler from "./handlers/profile";
import entryHandler from "./handlers/entry";
import fallbackHandler from "./handlers/fallback";
import {entryRssHandler, authorRssHandler} from "./handlers/rss";
import * as pApi from "./handlers/private-api";

const server = express();

const entryFilters = Object.values(EntryFilter);
const profileFilters = Object.values(ProfileFilter);

server
    .disable("x-powered-by")
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
    .use(express.json())
    .use(cookieParser())
    .get(
        [
            `^/:filter(${entryFilters.join("|")})/:tag/rss.xml$`, // /trending/esteem/rss.xml
        ],
        entryRssHandler
    )
    .get(
        [
            "^/@:author/:section(feed|blog|posts)/rss.xml$", // /posts/@esteemapp/rss.xml
            "^/@:author/rss.xml$", // @esteemapp/rss.xml
        ],
        authorRssHandler
    )
    .get(
        [
            `^/:filter(${entryFilters.join("|")}|subscribers|activities|roles)/:name(hive-[\\d]+)$`, //  /hot/hive-231312
        ],
        communityHandler
    )
    .get(
        [
            "^/$", // index
            `^/:filter(${entryFilters.join("|")})$`, // /trending
            `^/:filter(${entryFilters.join("|")})/:tag$`, //  /trending/esteem
            `^/@:tag/:filter(feed)$`, //  /@user/feed
        ],
        entryIndexHandler
    )
    .get(
        [
            "^/@:username$", // /@esteemapp
            `^/@:username/:section(${profileFilters.join("|")}|communities|wallet|points|settings)$`, // /@esteemapp/comments
        ],
        profileHandler
    )
    .get(
        [
            "^/:category/@:author/:permlink$", // /esteem/@esteemapp/rss-feeds-added-into-esteem-website
            "^/@:author/:permlink$", // /@esteemapp/rss-feeds-added-into-esteem-website
        ],
        entryHandler
    )
    .get("^/api/received-vesting/:username$", pApi.receivedVesting)
    .get("^/api/leaderboard/:duration(day|week|month)$", pApi.leaderboard)
    .get("^/api/popular-users$", pApi.popularUsers)
    .get("^/api/promoted-entries$", pApi.promotedEntries)
    .post("^/api/comment-history$", pApi.commentHistory)
    .post("^/api/search$", pApi.search)
    .post("^/api/search-follower$", pApi.searchFollower)
    .post("^/api/search-following$", pApi.searchFollowing)
    .post("^/api/points$", pApi.points)
    .post("^/api/point-list$", pApi.pointList)
    .post("^/api/account-create$", pApi.createAccount)
    .post("^/api/hs-token-refresh$", pApi.hsTokenRefresh)
    /* Login required endpoints */
    .post("^/api/notifications$", pApi.notifications)
    .post("^/api/notifications/unread$", pApi.unreadNotifications)
    .post("^/api/notifications/mark$", pApi.markNotifications)
    .post("^/api/usr-activity$", pApi.usrActivity)
    .post("^/api/images$", pApi.images)
    .post("^/api/images-delete$", pApi.imagesDelete)
    .post("^/api/images-add$", pApi.imagesAdd)
    .post("^/api/drafts$", pApi.drafts)
    .post("^/api/drafts-add$", pApi.draftsAdd)
    .post("^/api/drafts-update$", pApi.draftsUpdate)
    .post("^/api/drafts-delete$", pApi.draftsDelete)
    .post("^/api/bookmarks$", pApi.bookmarks)
    .post("^/api/bookmarks-add$", pApi.bookmarksAdd)
    .post("^/api/bookmarks-delete$", pApi.bookmarksDelete)
    .post("^/api/schedules$", pApi.schedules)
    .post("^/api/schedules-add$", pApi.schedulesAdd)
    .post("^/api/schedules-delete$", pApi.schedulesDelete)
    .post("^/api/schedules-move$", pApi.schedulesMove)
    .post("^/api/favorites$", pApi.favorites)
    .post("^/api/favorites-check$", pApi.favoritesCheck)
    .post("^/api/favorites-add$", pApi.favoritesAdd)
    .post("^/api/favorites-delete$", pApi.favoritesDelete)
    .post("^/api/points-claim$", pApi.pointsClaim)
    .post("^/api/points-calc$", pApi.pointsCalc)
    .post("^/api/promote-price$", pApi.promotePrice)
    .post("^/api/promoted-post$", pApi.promotedPost)
    .post("^/api/search-path$", pApi.searchPath)
    .post("^/api/boost-options$", pApi.boostOptions)
    .post("^/api/boosted-post$", pApi.boostedPost)
    .get("*", fallbackHandler);

export default server;
